"use client";

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useBoundStore } from '@/hooks/boundStore';
import TodoList from './todoList';

const days = ['월', '화', '수', '목', '금', '토', '일'];

export default function Calendar() {
  const router = useRouter();
  const {date, incrementMonth, decrementMonth} = useBoundStore();

  const {daysArray, isMonthArray} = thisMonth(date.year, date.month);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY < 0) {
      decrementMonth();
    } 
    else if (event.deltaY > 0) {
      incrementMonth();
    }
  };

  return <styles.displayWrapper>
      <styles.leftPadding/>
      <styles.calendarWrapper onWheel={handleWheel}>
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
            daysArray.map((day, index) => {
              const pushDate = String(date.year)+String(date.month).padStart(2,'0')+String(day).padStart(2,'0');

              return <styles.dateStyle onDoubleClick={() => {isMonthArray[index] && router.push(`/${pushDate}/todo`)}} key={index} isMonth={isMonthArray[index]}>
                {
                  dateStyle(day, index, date, isMonthArray)
                }
                <TodoList pushDate={pushDate} />
              </styles.dateStyle>
            })
          }
        </styles.dateWrapper>
      </styles.calendarWrapper>
    </styles.displayWrapper>;
};

const dateStyle = (day:number,
                  index: number,
                  date: {year:number, month:number}, 
                  isMonthArray: boolean[],
                  ) => {
  const today = new Date()

  if(day == today.getDate() && date.month == today.getMonth()+1 && date.year == today.getFullYear()) {
    return <styles.todayStyle>{day}</styles.todayStyle>
  }

  if(day === 1 && isMonthArray[index]) {
    return <styles.dateWord>{date.month}월 1일</styles.dateWord>
  }

  if(day === 1 && !isMonthArray[index]) {
    return <styles.dateWord>{nextMonth(date.month)}월 1일</ styles.dateWord>
  }
  
  return <styles.dateWord>{day}</ styles.dateWord>
}

const nextMonth = (currentMonth: number) => {
  return currentMonth === 12 ? 1 : currentMonth + 1;
}

const thisMonth = (year: number, month: number) => {
  const sunFirstDay = new Date(year, month - 1, 1).getDay();
  const sunLastDay = new Date(year, month, 0).getDay();
  const firstDay = sunFirstDay-1 < 0 ? 6 : sunFirstDay-1;
  const lastDay = sunLastDay-1 < 0 ? 6 : sunLastDay-1;

  const lastDate = new Date(year, month, 0).getDate();

  const firstDate = lastDate - firstDay + 1;

  return {
    daysArray: [...Array.from({length: lastDate-firstDate+1}, (_, i) => firstDate + i),
                    ...[...Array(lastDate).keys()].map((i) => i + 1),
                    ...Array.from({length: 6-lastDay}, (_, i) => i+1)],
    isMonthArray: [...Array.from({length: lastDate-firstDate+1}, (_, i) => false),
      ...[...Array(lastDate).keys()].map((i) => true),
      ...Array.from({length: 6-lastDay}, (_, i) => false)]
  };
}

const styles = {
  displayWrapper: styled.div`
    display: flex;
    flex-grow: 1;
  `,
  leftPadding: styled.div`
    width: 9px;
    height: 100%;
    border-right: 1px solid #ddd;
  `,
  calendarWrapper: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    flex-grow: 1;
  `,
  dayWrapper: styled.div`
    display: flex;
    width: 100%;
  `,
  dateWrapper: styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 1fr;
    width: 100%;
    flex-grow: 1;
  `,
  dayStyle: styled.div`
    text-align: center;
    background-color: #fff;
    color: #70757a;
    border-right: 1px solid #ddd;
    padding-top: 8px;
    font-size: 12px;
    flex-grow: 1;
  `,
  dateStyle: styled.div<{ isMonth: boolean }>`
    display:flex;
    text-align: center;
    align-items: center;
    color: ${(props) => (props.isMonth ? '#3d4144' : '#70757a')};
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding-top: 3px;
    flex-direction: column;
    font-size: 12px;
  `,
  dateWord: styled.div`
    height: 24px;
    line-height: 24px;
  `,
  todayStyle: styled.div`
    color: #fff;
    height: 24px;
    line-height: 24px;
    width: 24px;
    border-radius:50%;
    background-color: #1b74e9;
  `,
};