import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import AddPerson from "./";

describe("AddPerson Component", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders the AddPerson component", () => {
		render(<AddPerson />);
		const addButton = screen.getByRole("button", { name: /adicionar/i });
		expect(addButton).toBeInTheDocument();
	});

	it("displays dialog content when clicking the button", async () => {
		render(<AddPerson />);

		const dialogTrigger = screen.getByRole("button", { name: /adicionar/i });
		fireEvent.click(dialogTrigger);

		const dialogTitle = await screen.findByText(/cadastrar pessoa/i);
		expect(dialogTitle).toBeInTheDocument();

		const nameInput = screen.getByLabelText(/nome/i);
		expect(nameInput).toBeInTheDocument();
	});

	it("allows filling the form fields inside the dialog", async () => {
		render(<AddPerson />);

		const dialogTrigger = screen.getByRole("button", { name: /adicionar/i });
		fireEvent.click(dialogTrigger);

		const nameInput = screen.getByLabelText(/nome/i);
		fireEvent.change(nameInput, { target: { value: "João da Silva" } });

		expect(nameInput).toHaveValue("João da Silva");
	});
});
