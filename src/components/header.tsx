"use client";

import React from 'react';
import styled from '@emotion/styled';
import useDate from '../hooks/useDateInfo';
import useMiniDate from '@/hooks/useMiniDateInfo';
import useMenuData from '@/hooks/menuData';

const Header = () => {
  const {date, setDate, todaySet} = useDate();
  const {setMiniDate, setMiniToday} = useMiniDate();
  const {isOpen, setOpen} = useMenuData();

  const lastMonthClick = () => {
    let year: number = date.year;
    let month: number = date.month;

    if(month == 1) {
      year -= 1;
      month = 12;
    }
    else {
      month -= 1;
    }

    setDate({year:year, month:month});
    setMiniDate({year:year, month:month});
  };

  const nextMonthClick = () => {
    let year: number = date.year;
    let month: number = date.month;

    if(month == 12) {
      year += 1;
      month = 1;
    }
    else {
      month += 1;
    }

    setDate({year:year, month:month});
    setMiniDate({year:year, month:month});
  }

  const todayClick = () => {
    todaySet();
    setMiniToday();
  }

  const menuClick = () => {
    setOpen(!isOpen);
  }

  return (
    <styles.headerWrapper>
      <styles.menuWrapper onClick={menuClick}>
        <styles.menuButton focusable="false" width={24} height={24}>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill='#5f6368'/>
        </styles.menuButton>
      </styles.menuWrapper>
      <styles.calendarSpan role="heading">캘린더</styles.calendarSpan>
      <styles.todayButton onClick={todayClick}>
        <styles.today>
          오늘
        </styles.today>
      </styles.todayButton>
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
      <styles.date>
        {date.year}년 {date.month}월
      </styles.date>
    </styles.headerWrapper>
  );
};

const styles = {
  headerWrapper: styled.div`
    display:flex;
    padding: 8px;
    height: 65px;
    flex-shrink: 0;
    border-bottom: 1px solid #ddd;
    background-color: #ffffff;
  `,
  menuWrapper: styled.div`
    align-items: center;
    margin: auto 0;
    border-radius: 50%;
    background: transparent;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    margin-left: 4px;
    cursor: pointer;

    &:hover {
      background: rgba(60, 64, 67, .1);
    }
  `,
  menuButton: styled.svg`
    margin: 12px 12px 12px 12px;
  `,
  todayButton: styled.button`
    align-items: center;
    margin: auto 0;
    min-width: 64px;
    min-height: 36px;
    background: transparent;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: #ddd;
    color: rgb(60, 64, 67);
    font-size: 14px;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
      background: rgba(60, 64, 67, .05);
    }
  `,
  today: styled.div`
    margin-top: 2px;
  `,
  date: styled.div`
    text-align: center;
    color: #3d4144;
    font: 400 22px / 28px "Google Sans", Roboto, Arial, sans-serif;
    align-items: center;
    margin: auto 0;
    width: 144px;
  `,
  calendarSpan: styled.span`
    display: inline-block;
    color: #3d4144;
    padding-left: 52px;
    padding-right: 76px;
    font-size: 22px;
    align-items: center;
    margin: auto 0;
    line-height: 24px;
  `,
  lastMonthWrapper: styled.div`
    display: flex;
    justify-content: center;
    margin: auto 0;
    width: 32px;
    height: 32px;
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
    width: 32px;
    height: 32px;
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
    margin-right: 6px;
    border-radius: 50%;
    cursor: pointer;
    transform: scale(0.5, 0.5);
  `,
};

export default Header;