export const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

export const calculateScore = (item, query) => {
    const q = query.toLowerCase();
    let score = 0;

    if (item.name?.toLowerCase().includes(q)) score += 5;
    if (item.category?.toLowerCase().includes(q)) score += 3;
    if (item.description?.toLowerCase().includes(q)) score += 2;
    if (item.location?.toLowerCase().includes(q)) score += 1;

    return score;
};