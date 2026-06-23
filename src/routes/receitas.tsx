import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/services/api";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/receitas")({
  component: RecipesPage,
});

type Recipe = {
  id: number;
  product_name: string;
  product_price: string;
  ingredient_name: string;
  ingredient_unit: string;
  ingredient_cost: string;
  quantity: string;
};

function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadRecipes() {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get<Recipe[]>("recipes/");
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
      setError("Não foi possível carregar as receitas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  const groupedRecipes = useMemo(() => {
  return recipes.reduce<Record<string, Recipe[]>>((acc, recipe) => {
    if (!acc[recipe.product_name]) {
      acc[recipe.product_name] = [];
    }

    acc[recipe.product_name].push(recipe);
    return acc;
  }, {});
}, [recipes]);

const recipeStats = useMemo(() => {
  const products = Object.entries(groupedRecipes).map(([productName, items]) => {
    const totalCost = items.reduce((sum, recipe) => {
      return sum + Number(recipe.quantity) * Number(recipe.ingredient_cost);
    }, 0);

    const salePrice = Number(items[0]?.product_price ?? 0);
    const profit = salePrice - totalCost;
    const margin = salePrice > 0 ? (profit / salePrice) * 100 : 0;

    return {
      productName,
      totalCost,
      profit,
      margin,
    };
  });

  return {
    productsCount: products.length,
    averageCost:
      products.reduce((sum, p) => sum + p.totalCost, 0) /
      (products.length || 1),
    averageProfit:
      products.reduce((sum, p) => sum + p.profit, 0) /
      (products.length || 1),
    bestMargin: products.reduce(
      (best, p) => (p.margin > best.margin ? p : best),
      {
        productName: "—",
        totalCost: 0,
        profit: 0,
        margin: 0,
      }
    ),
  };
}, [groupedRecipes]);

  return (
    <div>
      <PageHeader
        title="Receitas"
        description="Ingredientes utilizados em cada produto"
      />

      <Card className="mb-4 p-5">
  <h2 className="text-lg font-semibold mb-4">📊 Resumo</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
        <div className="rounded-lg border p-3">
          <p className="text-muted-foreground">Produtos cadastrados</p>
          <p className="font-semibold">{recipeStats.productsCount}</p>
        </div>

        <div className="rounded-lg border p-3">
          <p className="text-muted-foreground">Custo médio</p>
          <p className="font-semibold">R$ {recipeStats.averageCost.toFixed(2)}</p>
        </div>

        <div className="rounded-lg border p-3">
          <p className="text-muted-foreground">Lucro médio</p>
          <p className="font-semibold text-emerald-600">
            R$ {recipeStats.averageProfit.toFixed(2)}
          </p>
        </div>

        <div className="rounded-lg border p-3">
          <p className="text-muted-foreground">Maior margem</p>
          <p className="font-semibold">
            {recipeStats.bestMargin.productName} ({recipeStats.bestMargin.margin.toFixed(1)}%)
          </p>
        </div>
      </div>
    </Card>

      {loading ? (
        <Card className="p-5">
          <p>Carregando receitas...</p>
        </Card>
      ) : error ? (
        <Card className="p-5">
          <p className="text-red-600">{error}</p>
        </Card>
      ) : recipes.length === 0 ? (
        <Card className="p-5">
          <p>Nenhuma receita cadastrada.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Object.entries(groupedRecipes).map(([productName, items]) => {
            const totalCost = items.reduce((sum, recipe) => {
              return (
                sum +
                Number(recipe.quantity) * Number(recipe.ingredient_cost)
              );
            }, 0);

            const salePrice = Number(items[0]?.product_price ?? 0);
            const profit = salePrice - totalCost;
            const margin = salePrice > 0 ? (profit / salePrice) * 100 : 0;

            return (
              <Card key={productName} className="p-5">
                <h2 className="text-lg font-semibold mb-4">
                  🍽️ {productName}
                </h2>

                <div className="space-y-2">
                  {items.map((recipe) => {
                    const itemCost =
                      Number(recipe.quantity) *
                      Number(recipe.ingredient_cost);

                    return (
                      <div
                        key={recipe.id}
                        className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
                      >
                        <span className="font-medium">
                          {recipe.ingredient_name}
                        </span>

                        <span className="text-muted-foreground">
                          {recipe.quantity} {recipe.ingredient_unit} × R${" "}
                          {Number(recipe.ingredient_cost).toFixed(2)} = R${" "}
                          {itemCost.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 border-t pt-3 text-sm font-semibold text-emerald-600">
                  Custo total: R$ {totalCost.toFixed(2)}

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                    <div className="rounded-lg border p-3">
                      <p className="text-muted-foreground">Preço venda</p>
                      <p className="font-semibold">R$ {salePrice.toFixed(2)}</p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <p className="text-muted-foreground">Lucro</p>
                      <p className={profit >= 0 ? "font-semibold text-emerald-600" : "font-semibold text-red-600"}>
                        R$ {profit.toFixed(2)}
                      </p>
                    </div>

                    <div className="rounded-lg border p-3">
                      <p className="text-muted-foreground">Margem</p>
                      <p className={margin >= 0 ? "font-semibold text-emerald-600" : "font-semibold text-red-600"}>
                        {margin.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}