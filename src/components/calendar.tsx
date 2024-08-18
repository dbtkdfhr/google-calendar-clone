"use client";

import React from 'react';
import styled from '@emotion/styled';
import useDate from '@/hooks/useDateInfo';
import useMiniDate from '@/hooks/useMiniDateInfo';
import { useRouter } from 'next/navigation';

const days = ['월', '화', '수', '목', '금', '토', '일'];

const Calendar = () => {
  const router = useRouter();

  const {date, setDate} = useDate();
  const {setMiniDate} = useMiniDate();

  let nextMonth: number = 0;
  let firstDay = new Date(date.year, date.month - 1, 1).getDay();
  let lastDay = new Date(date.year, date.month, 0).getDay();
  const todayDay = new Date().getDate();

  const lastDate = new Date(date.year, date.month, 0).getDate();

  if(date.month == 12) nextMonth = 1;
  else nextMonth = date.month + 1;

  if(firstDay == 0) firstDay = 6;
  else firstDay -= 1;

  if(lastDay == 0) lastDay = 6;
  else lastDay -= 1;

  const firstDate = lastDate - firstDay + 1;

  const daysArray = [...Array.from({length: lastDate-firstDate+1}, (_, i) => firstDate + i),
                    ...[...Array(lastDate).keys()].map((i) => i + 1),
                    ...Array.from({length: 6-lastDay}, (_, i) => i+1)];

  const isMonthArray = [...Array.from({length: lastDate-firstDate+1}, (_, i) => false),
                    ...[...Array(lastDate).keys()].map((i) => true),
                    ...Array.from({length: 6-lastDay}, (_, i) => false)];

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY < 0) {
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
    } 
    else if (event.deltaY > 0) {
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
  };

  return (
    <styles.displayWrapper>
      <styles.leftPadding/>
      <styles.calendarWrapper onWheel={handleWheel}>
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
            daysArray.map((day, index) => {
                let pushDate = String(date.year);

                if(date.month < 9) {
                  pushDate += '0'+String(date.month);
                }
                else {
                  pushDate += String(date.month);
                }

                if(day < 9) {
                  pushDate += '0'+String(day);
                }
                else {
                  pushDate += String(day);
                }

                return <styles.dateStyle onDoubleClick={() => {if(isMonthArray[index])router.push(`/${pushDate}/todo`)}} key={'date'+index} isMonth={isMonthArray[index]} className={day === todayDay && isMonthArray[index] ? 'today' : ''}>
                  {
                    day === todayDay && date.month == new Date().getMonth()+1 && date.year == new Date().getFullYear()
                    ? <styles.todayStyle>{day}</styles.todayStyle>
                    :(day === 1 && isMonthArray[index]
                      ? <>{date.month}월 1일</>
                      :(day === 1 && !isMonthArray[index]
                        ?<>{nextMonth}월 1일</>
                        :<>{day}</>
                      )
                    )
                  }
                </styles.dateStyle>
              }
            )
          }
        </styles.dateWrapper>
      </styles.calendarWrapper>
    </styles.displayWrapper>
  );
};

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
    text-align: center;
    background-color: #fff;
    color: ${(props) => (props.isMonth ? '#3d4144' : '#70757a')};
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding-top: 8px;
    font-size: 12px;

    &.today {
      padding-top: 3px;
    }
  `,
  todayStyle: styled.div`
    display: inline-block;
    color: #fff;
    height: 24px;
    line-height: 24px;
    width: 24px;
    border-radius:50%;
    background-color: #1b74e9;
  `,
};

export default Calendar;