export function categoriesFormattedForDropdown(categories) {
  return categories.map(category => {
    return {
      value: category,
      text: category.toUpperCase()
    };
  });
}
