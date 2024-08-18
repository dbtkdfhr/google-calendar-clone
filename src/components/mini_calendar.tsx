"use client";

import React from 'react';
import styled from '@emotion/styled';
import MiniHeader from './mini_header';
import useMiniDate from '@/hooks/useMiniDateInfo';
import useDate from '@/hooks/useDateInfo';
import useMenuData from '@/hooks/menuData';

interface MenuProps {
  $isOpen?: boolean;
}

const MiniCalendar = () => {
  const {setDate} = useDate();
  const {miniDate} = useMiniDate();
  const {isOpen} = useMenuData();

  let nextMonth: number = 0;
  let firstDay = new Date(miniDate.year, miniDate.month - 1, 1).getDay();
  let lastDay = new Date(miniDate.year, miniDate.month, 0).getDay();
  const todayDay = new Date().getDate();

  const lastDate = new Date(miniDate.year, miniDate.month, 0).getDate();

  if(miniDate.month == 12) nextMonth = 1;
  else nextMonth = miniDate.month + 1;

  if(firstDay == 0) firstDay = 6;
  else firstDay -= 1;

  if(lastDay == 0) lastDay = 6;
  else lastDay -= 1;

  const firstDate = lastDate - firstDay + 1;

  const daysArray = [...Array.from({length: lastDate-firstDate+1}, (_, i) => firstDate + i),
                    ...[...Array(lastDate).keys()].map((i) => i + 1)];

  daysArray.push(...Array.from({length: 42 - daysArray.length}, (_, i) => 1 + i));

  const isMonthArray = [...Array.from({length: lastDate-firstDate+1}, (_, i) => false),
                    ...[...Array(lastDate).keys()].map((i) => true)];

  isMonthArray.push(...Array.from({length: 42 - isMonthArray.length}, (_, i) => false));

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
          <styles.dayStyle>
            {day}
          </styles.dayStyle>
          ))
        }
      </styles.dayWrapper>
      <styles.dateWrapper>
        {
          daysArray.map((day, index) => (
            day === todayDay && miniDate.month == new Date().getMonth()+1 && miniDate.year == new Date().getFullYear()
            ? <styles.todayStyle onClick={dateClick}>{day}</styles.todayStyle>
            :<styles.dateStyle onClick={dateClick} key={index} isMonth={isMonthArray[index]} className={day === todayDay && isMonthArray[index] ? 'today' : ''}>
              {day}
            </styles.dateStyle>
          ))
        }
      </styles.dateWrapper>
    </styles.calendarWrapper>
  );
};
// transform: ${(props) => props.$isOpen? 'translateX(0)':'translateX(-100%)'};
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