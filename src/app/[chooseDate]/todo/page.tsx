'use client';

import AddTodo from "../../pages/add-todo";

type Props = {
  params: {
    chooseDate: string;
  }
}

export default function Page(props: Props) {
    return <AddTodo chooseDate={props.params.chooseDate}/>;
}