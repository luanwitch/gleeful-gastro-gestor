import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";

//Rota criada: "/receitas"
export const Route = createFileRoute("/receitas")({
  component: RecipesPage,
});

//Fromato dos dados tipagem: Cada receita que vem da API terá esses campos.
type Recipe = {
  id: number;
  product_name: string;
  ingredient_name: string;
  ingredient_unit: string;
  quantity: string;
};

function RecipesPage() {
  //Guarda os dados nos estados: 
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadRecipes() {
    try {
      //Busca as receitas no backend GET /api/recipes/ : 
      const response = await api.get<Recipe[]>("recipes/");
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  //Executa ao abrir a tela
  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <div>
      <PageHeader
        title="Receitas"
        description="Ingredientes utilizados em cada produto"
      />

      <Card className="p-5">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Produto</th>
                <th className="text-left">Ingrediente</th>
                <th className="text-left">Quantidade</th>
              </tr>
            </thead>

            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.product_name}</td>
                  <td>{recipe.ingredient_name}</td>
                  <td>
                    {recipe.quantity} {recipe.ingredient_unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}