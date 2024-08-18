"use client";

import styled from "@emotion/styled";
import Link from "next/link";

export default function AddTodo({chooseDate}: {chooseDate: string}) {
  console.log(chooseDate);

  const date = new Date(
    Number(chooseDate.slice(0,4)),
    Number(chooseDate.slice(4,6)),
    Number(chooseDate.slice(6,8))
  );

  return (
    <styles.displayWrapper>
      <styles.headerWrapper>
        <Link href="/">
          <styles.exitButtonWrapper>
            <styles.exitButton className="material-symbols-outlined">
              close
            </styles.exitButton>
          </styles.exitButtonWrapper>
        </Link>
        <styles.titleInput type="text" placeholder="제목 추가"/>
        <styles.saveButton>저장</styles.saveButton>
      </styles.headerWrapper>
      <styles.dateWrapper>
        <styles.dateInput type="text" value={date.getFullYear()+"년 "+date.getMonth()+"월 "+date.getDate()+"일"}></styles.dateInput>
      </styles.dateWrapper>
    </styles.displayWrapper>
  );
}

const styles = {
  displayWrapper: styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background: #fff;
    flex-direction: column;
    padding: 0px 0px 0px 16px;
  `,
  headerWrapper: styled.div`
    display: flex;
    padding: 16px 0px;
  `,
  exitButtonWrapper: styled.div`
    display: flex;
    width: 40px;
    height: 40px;
    margin-top: 4px;
    border-radius: 50%;
    cursor: pointer;
    background: transparent;

    &:hover {
      background: rgba(60, 64, 67, .03);
    }
  `,
  exitButton: styled.div`
    align-items: center;
    margin: auto auto;
    color: rgb(95, 99, 104);
  `,
  titleInput: styled.input`
    width: 514.69px;
    height: 44px;
    margin: 2px 16px 0px 8px;
    font-size: 28px;
    border-width: 0 0 1px;
    border-color: rgb(218, 220, 224);
    color: rgb(60,64,67);

    &:focus {
      outline: none;
      border-color: rgb(25, 103, 210);
      border-width: 0 0 2px;
    }
  `,
  saveButton: styled.button`
    width: 76px;
    height: 36px;
    margin: 4px 0px 0px 16px;
    border-radius: 4px;
    background: rgb(26, 115, 232);
    border-width: 0;
    color: #fff;
    font-size: .875rem;
    cursor: pointer;

    &:hover {
      background: rgb(24, 90, 188);
    }
  `,
  dateWrapper: styled.div`
    width: 117px;
    height: 36px;
    margin: 6px 0px 0px 48px;
    border-radius: 4px;
    background: rgb(241, 243, 244);
  `,
  dateInput: styled.input`
    background: transparent;
    width: 100%;
    height: 100%;
    padding: 0 8px;
    font-size: 14px;
    border-width: 0;
    color: rgb(60, 64, 67);
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: rgb(25, 103, 210);
      border-width: 0 0 2px;
    }
  `,
}