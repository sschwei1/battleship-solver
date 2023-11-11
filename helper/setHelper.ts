export const tryAddElementToSet = <T>(set: Set<T>, element: T): boolean => {
    if(set.has(element)) {
        return false;
    }

    set.add(element);
    return true;
}