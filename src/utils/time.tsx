import React from 'react';
import { BiCoffeeTogo } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { RiRestTimeLine } from 'react-icons/ri';

import { Tag } from 'element-react';

interface Hours {
  hours?: number;
  minutes?: number;
}
export function toHourString(hour: Hours): string {
  const h = hour.hours ? hour.hours : 0;
  const m = hour.minutes ? hour.minutes : 0;
  return (h <= 9 ? '0' + h : h) + ':' + (m <= 9 ? '0' + m : m);
}

export function typesHours(type: string, hours: Hours): React.ReactNode {
  const time = toHourString(hours);
  const color =
    type === 'coffee' ? '#a38068' : type === 'lunch' ? '#d800f7' : '#f7b500';
  return time !== '00:00' ? (
    <Tag style={{ marginRight: 5, background: color }}>
      {type === 'coffee' ? (
        <BiCoffeeTogo style={{ marginTop: 5, marginRight: 5 }} />
      ) : type === 'lunch' ? (
        <IoFastFoodOutline style={{ marginTop: 5, marginRight: 5 }} />
      ) : (
        <RiRestTimeLine style={{ marginTop: 5, marginRight: 5 }} />
      )}
      {time}
    </Tag>
  ) : null;
}
