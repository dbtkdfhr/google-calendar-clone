"use client";

import React from 'react';
import styled from '@emotion/styled';
import { useBoundStore } from '@/hooks/boundStore';

const MiniHeader = () => {
  const {miniDate, incrementMiniMonth, decrementMiniMonth} = useBoundStore();

  const lastMonthClick = () => {
    decrementMiniMonth();
  };

  const nextMonthClick = () => {
    incrementMiniMonth();
  }

  return (
    <styles.headerWrapper>
      <styles.date>
        {miniDate.year}년 {miniDate.month}월
      </styles.date>
      <styles.lastMonthWrapper onClick={lastMonthClick}>
        <styles.lastMonthButton className="material-symbols-outlined">
          arrow_forward_ios
        </styles.lastMonthButton>
      </styles.lastMonthWrapper>
      <styles.nextMonthWrapper onClick={nextMonthClick}>
        <styles.nextMonthButton className="material-symbols-outlined">
          arrow_forward_ios
        </styles.nextMonthButton>
      </styles.nextMonthWrapper>
    </styles.headerWrapper>
  );
};

const styles = {
  headerWrapper: styled.div`
    display:flex;
    height: 32px;
    flex-shrink: 0;
  `,
  date: styled.div`
    text-align: left;
    color: #3d4144;
    font-size: 14px;
    align-items: center;
    margin: auto 9px;
    width: 144px;
  `,
  lastMonthWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin: auto 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;

    &:hover {
      background: rgba(60, 64, 67, .05);
    }
  `,
  lastMonthButton: styled.div`
    align-items: center;
    margin: auto 0;
    color: rgb(95, 99, 104);
    cursor: pointer;
    transform: scale(0.5, 0.5) rotate(180deg);
  `,
  nextMonthWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin: auto 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;

    &:hover {
      background: rgba(60, 64, 67, .05);
    }
  `,
  nextMonthButton: styled.i`
    align-items: center;
    margin: auto 0;
    color: rgb(95, 99, 104);
    margin-left: 4px;
    border-radius: 50%;
    cursor: pointer;
    transform: scale(0.5, 0.5);
  `,
};

export default MiniHeader;