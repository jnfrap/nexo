import { describe, expect, it } from "vitest";


const sum = (a, b) => a + b;

describe("Sum Function Tests", () => {
  it("should return the sum of two positive numbers", () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
  });

  it("should return the sum of a positive and a negative number", () => {
    const result = sum(5, -3);
    expect(result).toBe(2);
  });

  it("should return the sum of two negative numbers", () => {
    const result = sum(-2, -3);
    expect(result).toBe(-5);
  });

  it("should return zero when both numbers are zero", () => {
    const result = sum(0, 0);
    expect(result).toBe(0);
  });
});


/// EXAMPLE
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import nuestroModulo from '../src/...loquesea'

describe('Creación de tableros', () => {
  it('Creación de un tablero', async () => {

    const wrapper = mount(nuestroModulo)

    const input = wrapper.get('#boardTitle')
    const button = wrapper.get('#createButton')

    await input.setValue('Nombre tablero')
    await button.trigger('click')

    const items = wrapper.findAll('li')

    expect(items).toHaveLength(1)
    expect(items[0].text()).toBe('Nombre tablero')
  })

  it('Tablero mostrado en el DOM', () => {

  })

})

import { getBoard } from '../src/sevices/api'
import * api from '../src/sevices/api' // importar como objeto para poder mockear

it('Obtener tableros', () => {
  vi.spyOn(api, 'getBoard').mockImplementationOnce(async (boardId) => {
    return {
      id: boardId,
      title: 'Tablero test',
      order: 1
    }
  })

  const board = await getBoard(1)
  /*
  board = {
      id: boardId,
      title: 'Tablero test',
      order: 1
  }
  */

  expect(board.title).toBe('Tablero test')

})


// ///////////////////////////////



// <template>

//     <input v-model="title" type="text" id="boartTitle"/>

//     <button @click="createBoard" id="createButton">Crear</button>



//     <ul>

//         <li v-for="(item, index) in items" :key="index"> {{ item }} </li>

//     </ul>

// </template>



// <script>

//     export default {

//         data() {

//             return {

//                 title: '',

//                 items: []

//             }

//         },

//         methods: {

//             createBoard() {

//                 if (this.title.trim()) {

//                     this.items.push(this.title)

//                     this.title = ''

//                 }

//             }

//         }

//     }

// </script>





// ///////////////////////////////

import { db } from '../src/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

vi, mock('.firebaseService', () => {
  getBoard: vi.fn()
})



it('Crear tablero', () => {
  const mockResult = {
    id: 1,
    title: 'Tablero test',
    order: 1
  }

  getBoard.mockResolveValue(mockResult)

  const board = await getBoard(1)

  expect(board.title).toBe('Tablero test')
})

beforeEach(() => {
  vi, mock('.firebaseService', () => {
    getBoard: vi.fn()
  })
})
