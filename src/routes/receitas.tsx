import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { api } from "@/services/api";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import type { Product } from "@/types";
import { toast } from "sonner";

export const Route = createFileRoute("/receitas")({
  component: RecipesPage,
});

type Recipe = {
  id: number;
  product: number;
  product_name: string;
  product_price: string;
  ingredient: number;
  ingredient_name: string;
  ingredient_unit: string;
  ingredient_cost: string;
  quantity: string;
};

type Ingredient = {
  id: number;
  name: string;
  unit: string;
  cost_per_unit: string | number;
  active: boolean;
};

type ProductProfitability = {
  productName: string;
  totalCost: number;
  profit: number;
  margin: number;
};

function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [productId, setProductId] = useState("");
  const [ingredientId, setIngredientId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      const [recipesResponse, productsResponse, ingredientsResponse] =
        await Promise.all([
          api.get<Recipe[] | { results: Recipe[] }>("recipes/"),
          api.get<Product[] | { results: Product[] }>("products/"),
          api.get<Ingredient[] | { results: Ingredient[] }>("ingredients/"),
        ]);

      const recipesData = Array.isArray(recipesResponse.data)
        ? recipesResponse.data
        : recipesResponse.data.results ?? [];

      const productsData = Array.isArray(productsResponse.data)
        ? productsResponse.data
        : productsResponse.data.results ?? [];

      const ingredientsData = Array.isArray(ingredientsResponse.data)
        ? ingredientsResponse.data
        : ingredientsResponse.data.results ?? [];

      setRecipes(recipesData);
      setProducts(productsData);
      setIngredients(ingredientsData);

      if (!productId && productsData.length > 0) {
        setProductId(String(productsData[0].id));
      }

      if (!ingredientId && ingredientsData.length > 0) {
        setIngredientId(String(ingredientsData[0].id));
      }
    } catch (error) {
      console.error(error);
      setError("Não foi possível carregar as receitas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!productId || !ingredientId || !quantity) {
      toast.error("Preencha produto, ingrediente e quantidade.");
      return;
    }

    try {
      setSaving(true);

      await api.post("recipes/", {
        product: Number(productId),
        ingredient: Number(ingredientId),
        quantity,
      });

      toast.success("Receita cadastrada com sucesso!");

      setQuantity("");
      await loadData();
    } catch (error: any) {
      console.error(error?.response?.data);

      const data = (error as any)?.response?.data;

      const message =
        data?.error ||
        data?.detail ||
        JSON.stringify(data) ||
        "Não foi possível registrar a venda.";

      toast.error(message);
      console.log(data);
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(recipeId: number) {
    if (!confirm("Deseja remover este ingrediente da receita?")) return;

    try {
      await api.delete(`recipes/${recipeId}/`);
      toast.success("Ingrediente removido da receita.");
      await loadData();
    } catch {
      toast.error("Não foi possível remover o ingrediente.");
    }
  }

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
    const productsStats: ProductProfitability[] = Object.entries(
      groupedRecipes
    ).map(([productName, items]) => {
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

    const fallbackProduct: ProductProfitability = {
      productName: "—",
      totalCost: 0,
      profit: 0,
      margin: 0,
    };

    return {
      productsCount: productsStats.length,
      averageCost:
        productsStats.reduce((sum, p) => sum + p.totalCost, 0) /
        (productsStats.length || 1),
      averageProfit:
        productsStats.reduce((sum, p) => sum + p.profit, 0) /
        (productsStats.length || 1),
      bestMargin: productsStats.reduce(
        (best, p) => (p.margin > best.margin ? p : best),
        fallbackProduct
      ),
      mostProfitable: productsStats.reduce(
        (best, p) => (p.profit > best.profit ? p : best),
        fallbackProduct
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
        <h2 className="text-lg font-semibold mb-4">Nova receita</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
        >
          <div>
            <label className="text-sm font-medium">Produto</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="">Selecione...</option>
              {products
                .filter((product) => product.active)
                .map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Ingrediente</label>
            <select
              value={ingredientId}
              onChange={(e) => setIngredientId(e.target.value)}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="">Selecione...</option>
              {ingredients
                .filter((ingredient) => ingredient.active)
                .map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name} ({ingredient.unit})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Quantidade</label>
            <input
              type="number"
              step="0.001"
              min="0.001"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ex: 0.200"
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Adicionar"}
            </button>
          </div>
        </form>
      </Card>

      <Card className="mb-4 p-5">
        <h2 className="text-lg font-semibold mb-4">📊 Resumo</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border p-3">
            <p className="text-muted-foreground">Produtos cadastrados</p>
            <p className="font-semibold">{recipeStats.productsCount}</p>
          </div>

          <div className="rounded-lg border p-3">
            <p className="text-muted-foreground">Custo médio</p>
            <p className="font-semibold">
              R$ {recipeStats.averageCost.toFixed(2)}
            </p>
          </div>

          <div className="rounded-lg border p-3">
            <p className="text-muted-foreground">Lucro médio</p>
            <p className="font-semibold text-emerald-600">
              R$ {recipeStats.averageProfit.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-3">🏆 Destaques</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground">Maior margem</p>
              <p className="font-semibold">{recipeStats.bestMargin.productName}</p>
              <p className="text-emerald-600 font-semibold">
                {recipeStats.bestMargin.margin.toFixed(1)}%
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground">Mais lucrativo</p>
              <p className="font-semibold">
                {recipeStats.mostProfitable.productName}
              </p>
              <p className="text-emerald-600 font-semibold">
                R$ {recipeStats.mostProfitable.profit.toFixed(2)}
              </p>
            </div>
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
                sum + Number(recipe.quantity) * Number(recipe.ingredient_cost)
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
                        className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm"
                      >
                        <span className="font-medium">
                          {recipe.ingredient_name}
                        </span>

                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground text-right">
                            {recipe.quantity} {recipe.ingredient_unit} × R${" "}
                            {Number(recipe.ingredient_cost).toFixed(2)} = R${" "}
                            {itemCost.toFixed(2)}
                          </span>

                          <button
                            onClick={() => handleDelete(recipe.id)}
                            className="rounded-lg bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 border-t pt-3 text-sm font-semibold text-emerald-600">
                  Custo total: R$ {totalCost.toFixed(2)}
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                  <div className="rounded-lg border p-3">
                    <p className="text-muted-foreground">Preço venda</p>
                    <p className="font-semibold">R$ {salePrice.toFixed(2)}</p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <p className="text-muted-foreground">Lucro</p>
                    <p
                      className={
                        profit >= 0
                          ? "font-semibold text-emerald-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      R$ {profit.toFixed(2)}
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <p className="text-muted-foreground">Margem</p>
                    <p
                      className={
                        margin >= 0
                          ? "font-semibold text-emerald-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {margin.toFixed(1)}%
                    </p>
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