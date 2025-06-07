import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CreateBoardButtonComponent from "@/components/misc/navbar/CreateBoardButtonComponent.vue";




describe('Creación de tableros', () => {
  it('Creación de un tablero', async () => {
    const wrapper = mount(CreateBoardButtonComponent)

    const input = wrapper.get('#in_label')
    const button = wrapper.get('#dialogCreateButton')

    await input.setValue('Nombre tablero')
    await button.trigger('click')

    const items = wrapper.findAll('li')

    expect(items).toHaveLength(1)
    expect(items[0].text()).toBe('Nombre tablero')
  })
})
