import { describe, expect, it, vi } from "vitest";
import * as boardService from "../src/shared/services/boardService";

describe('Obtener tablero por ID', () => {
  it('Obtener un tablero por ID', async () => {
    const boardId = 'board123';
    const boardData = {
      title: 'Tablero de prueba',
      description: 'Descripción del tablero de prueba',
      backgroundImage: 'https://example.com/image.jpg',
      isFavorite: false,
      createdAt: new Date(),
      lastAccessedAt: new Date(),
      userId: 'user123',
    };

    // Simular la respuesta del servicio
    vi.spyOn(boardService, 'getBoardByID').mockResolvedValue(boardData);

    const board = await boardService.getBoardByID(boardId);

    expect(board).toEqual(boardData);
  });
}
);

describe('Guardar tablero', () => {
  it('Guardar un tablero', async () => {
    const newBoard = {
      title: 'Nuevo Tablero',
      description: 'Descripción del nuevo tablero',
      backgroundImage: 'https://example.com/image.jpg',
      isFavorite: false,
      createdAt: new Date(),
      lastAccessedAt: new Date(),
      userId: 'user123',
    };

    // Simular la respuesta del servicio
    vi.spyOn(boardService, 'saveBoard').mockResolvedValue({
      id: 'newBoard123',
      ...newBoard,
    });

    const savedBoard = await boardService.saveBoard(newBoard);

    expect(savedBoard).toHaveProperty('id');
    expect(savedBoard.title).toBe(newBoard.title);
  });
}
);

describe('Actualizar tablero', () => {
  it('Actualizar un tablero existente', async () => {
    const updatedBoard = {
      id: 'board123',
      title: 'Tablero Actualizado',
      description: 'Descripción actualizada del tablero',
      backgroundImage: 'https://example.com/image.jpg',
      isFavorite: true,
      lastAccessedAt: new Date(),
    };

    // Simular la respuesta del servicio
    vi.spyOn(boardService, 'updateBoard').mockResolvedValue(updatedBoard);

    const result = await boardService.updateBoard(updatedBoard);

    expect(result).toEqual(updatedBoard);
  });
}
);

describe('Delete board', () => {
  it('Delete a board by ID', async () => {
    const boardId = 'board123';

    // Simular la respuesta del servicio
    vi.spyOn(boardService, 'deleteBoard').mockResolvedValue();

    await boardService.deleteBoard(boardId);

    expect(boardService.deleteBoard).toHaveBeenCalledWith(boardId);
  });
}
);
