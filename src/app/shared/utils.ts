export function shuffle<T>(array: Array<T>): Array<T> {
  /*
    Перемешивание вариантов ответов с помощью алгоритма Фишера-Йейтса:
    - Цикл идет от последнего элемента к первому.
    - Для каждого элемента выбирается случайный индекс от 0 до текущего.
    - Элементы с текущим и случайным индексами меняются местами. 
    */
  const shuffledOptions = [...array];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [
      shuffledOptions[j],
      shuffledOptions[i],
    ];
  }
  return shuffledOptions;
}
