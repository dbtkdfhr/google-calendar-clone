"use client";

import React from 'react';
import styled from '@emotion/styled';
import MiniHeader from './mini_header';
import { useBoundStore } from '@/hooks/boundStore';

interface MenuProps {
  $isOpen?: boolean;
}

const MiniCalendar = () => {
  const {miniDate, setDate} = useBoundStore();
  const isOpen = useBoundStore((state)=>state.isOpen);

  const {daysArray, isMonthArray} = thisMonth(miniDate.year, miniDate.month);

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const dateClick = () => {
    setDate({year:miniDate.year, month:miniDate.month});
  }

  return (
    <styles.calendarWrapper $isOpen={isOpen}>
      <MiniHeader/>
      <styles.dayWrapper>
        {
          days.map((day) => (
          <styles.dayStyle key={day}>
            {day}
          </styles.dayStyle>
          ))
        }
      </styles.dayWrapper>
      <styles.dateWrapper>
        {
          daysArray.map((day, index) => (
            day === new Date().getDate() && miniDate.month == new Date().getMonth()+1 && miniDate.year == new Date().getFullYear()
            ? <styles.todayStyle key={index} onClick={dateClick}>{day}</styles.todayStyle>
            :<styles.dateStyle onClick={dateClick} key={index} isMonth={isMonthArray[index]}>
              {day}
            </styles.dateStyle>
          ))
        }
      </styles.dateWrapper>
    </styles.calendarWrapper>
  );
};

const thisMonth = (year: number, month: number) => {
  const sunFirstDay = new Date(year, month - 1, 1).getDay();
  const sunLastDay = new Date(year, month, 0).getDay();
  const firstDay = sunFirstDay-1 < 0 ? 6 : sunFirstDay-1;
  const lastDay = sunLastDay-1 < 0 ? 6 : sunLastDay-1;

  const lastDate = new Date(year, month, 0).getDate();

  const firstDate = lastDate - firstDay + 1;

  const daysArray = [...Array.from({length: lastDate-firstDate+1}, (_, i) => firstDate + i),
    ...[...Array(lastDate).keys()].map((i) => i + 1),
    ...Array.from({length: 6-lastDay}, (_, i) => i+1)];

  const isMonthArray = [...Array.from({length: lastDate-firstDate+1}, (_, i) => false),
    ...[...Array(lastDate).keys()].map((i) => true),
    ...Array.from({length: 6-lastDay}, (_, i) => false)];

  daysArray.push(...Array.from({length: 42 - daysArray.length}, (_, i) => 1 + i));
  isMonthArray.push(...Array.from({length: 42 - isMonthArray.length}, (_, i) => false));

  return {
    daysArray: daysArray,
    isMonthArray: isMonthArray
  };
}

const styles = {
  calendarWrapper: styled.div<MenuProps>`
    display: flex;
    width: 215px;
    height: 212px;
    margin: 84px 22px 16px 19px;
    margin-left: ${(props) => props.$isOpen? '19px':'-237px'};
    flex-direction: column;
    transition-duration: 0.3s;
    transition-property: margin-left;
    overflow: hidden;
  `,
  dayWrapper: styled.div`
    display: flex;
    width: 100%;
  `,
  dateWrapper: styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
    flex-grow: 1;
  `,
  dayStyle: styled.div`
    text-align: center;
    background: transparent;
    color: #70757a;
    font-size: 10px;
    width: 30.78px;
    height: 24px;
    flex-grow: 1;
    padding-top: 5px;
  `,
  dateStyle: styled.div<{ isMonth: boolean }>`
    text-align: center;
    background: transparent;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    color: ${(props) => (props.isMonth ? '#3d4144' : '#70757a')};
    font-size: 10px;
    cursor: pointer;
    padding-top: 6px;
    padding-left: 1px;
    margin: 1px 3.39px;

    &:hover {
        background: rgba(60, 64, 67, .05);
    }
  `,

  todayStyle: styled.div`
    text-align: center;
    background: transparent;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    color: #fff;
    background-color: #1b74e9;
    font-size: 10px;
    cursor: pointer;
    padding-top: 6px;
    padding-left: 1px;
    margin: 1px 3.39px;
  `,
};

export default MiniCalendar;