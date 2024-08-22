import { useBoundStore } from '@/hooks/boundStore';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

interface propsType {
  pushDate: string
}

export default function TodoList (props: propsType) {
  const [clientSideTodos, setClientSideTodos] = useState<string[]>([]);
  const todo = useBoundStore((state) => state.todo);

  useEffect(() => {
    const todos = todo.get(props.pushDate) || [];
    setClientSideTodos(todos);
  }, [props.pushDate, todo]);

  return (
    <styles.todoWrapper>
      {clientSideTodos.map((value, index) => (
        <styles.todoStyle key={index}>
          {value}
        </styles.todoStyle>
      ))}
    </ styles.todoWrapper>
  );
};

const styles = {
  todoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    padding-right: 8px;
    padding-top: 3px;
  `,
  todoStyle: styled.div`
    text-align: left;
    width: 100%;
    height: 18px;
    overflow: hidden;
    border-radius: 4px;
    padding: 0px 4px;
    margin-bottom: 2px;
    background: rgb(11, 128, 67);
    font-size: 12px;
    color: #fff;
  `
}