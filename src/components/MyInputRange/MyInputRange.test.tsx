import {fireEvent, render, screen} from "@testing-library/react";
import MyInputRange from "./MyInputRange";
import React from "react";

test('show attack pattern table after fetching data', async () => {

    render(
        <MyInputRange name={'test'} label={'test'} />
    );

    fireEvent.change(screen.getByRole(`slider`), { target: { value: 9 } });

    expect(screen.getAllByRole('slider')[0]).toHaveValue('9')

});