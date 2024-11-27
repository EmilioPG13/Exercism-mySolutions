// @ts-check

/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 *
 * export function yourFunction(...) {
 *   ...
 * }
 */

// 1. Determine whether the lasagna is done
export function cookingStatus(min) {
    if (min === 0) {
        return 'Lasagna is done.';
    } else if (min > 0) {
        return 'Not done, please wait.';
    } else {
        return 'You forgot to set the timer.';
    }
};

//2. Estimate the preparation time
export function preparationTime(layers, min) {
    if(!min) {
        min = 2;
    }

    const totalPrepTime = layers.length * min;
    return totalPrepTime;
}

// 3. Compute the amounts of noodles and sauce needed
export function quantities(layers) {
    let noodles = 0;
    let sauce = 0;

    layers.forEach(layer => {
        if(layer === 'noodles') {
            noodles += 50;
        } else if (layer === 'sauce') {
            sauce += 0.2;
        }
    });

    return {
        noodles: noodles,
        sauce: sauce
    };
}

// 4. Add the secret ingredient
export function addSecretIngredient(friendsList, myList) {
    const lastItem = friendsList[friendsList.length - 1];
    myList.push(lastItem);
};

// 5. Scale the recipe
export function scaleRecipe(recipe, portions) {
    const scaledRecipe = {};
    const scaleFactor = portions / 2;

    for (let ingredient in recipe) {
        scaledRecipe[ingredient] = recipe[ingredient] * scaleFactor;
    }

    return scaledRecipe;
};