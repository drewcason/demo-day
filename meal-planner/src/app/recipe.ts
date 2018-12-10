export interface RecipeRes {
    data: Recipe[];
}

export interface Recipe {
    title: string;
    image: string;
    protein: string;
    season: Array<string>;
    ethnicity: string;
    count: number;
    cook_time: string;
    prep_time: string;
    servings: number;
    grocery_items:{
        ingredient: string;
        amount: string;
        }[];     
    directions: Array<string>;
}
