import { reactive } from 'vue'

export const storage = reactive({
  boards: [
      {
        id: 1,
        title: 'Board 1',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: false
      },
      {
        id: 2,
        title: 'Board 2',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: true
      },
      {
        id: 3,
        title: 'Board 3',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: false
      },
      {
        id: 4,
        title: 'Board 4',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: true
      },
      {
        id: 5,
        title: 'Board 5',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: false
      },
      {
        id: 6,
        title: 'Board 6',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: true
      },
      {
        id: 7,
        title: 'Board 7',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: false
      },
      {
        id: 8,
        title: 'Board 8',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: true
      },
      {
        id: 9,
        title: 'Board 9',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: false
      }
    ]
})
