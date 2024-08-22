'use client';

import AddTodo from "../../pages/add-todo";
import { useEffect } from "react";

export default function Page({ params: { chooseDate = '' } }: { params: { chooseDate?: string } }) {
    useEffect(() => {
        if (typeof chooseDate !== 'string') {
            console.error("Invalid chooseDate value", chooseDate);
        }
    }, [chooseDate]);

    return <AddTodo chooseDate={chooseDate}/>;
}
