import { Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { dashboardActions } from './dashboardSlice';
import { StatisticItem } from './components';
import { ReactComponent as Male } from 'assets/images/male.svg';
import { ReactComponent as Female } from 'assets/images/female.svg';
import { ReactComponent as HighMark } from 'assets/images/high-mark.svg';
import { ReactComponent as LowMark } from 'assets/images/low-mark.svg';
import style from './index.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.dashboard.loading);
  const statistics = useAppSelector((state) => state.dashboard.statistics);
  const highestStudentList = useAppSelector((state) => state.dashboard.highestStudentList);
  const LowestStudentList = useAppSelector((state) => state.dashboard.lowestStudentList);
  const rankingByCity = useAppSelector((state) => state.dashboard.rankingByCityList);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12} xl={6}>
        <StatisticItem
          icon={<Male className={cx('statistic_icon')} />}
          label="Male"
          value={statistics.maleCount}
        />
      </Col>
      <Col xs={24} md={12} xl={6}>
        <StatisticItem
          icon={<Female className={cx('statistic_icon')} />}
          label="Female"
          value={statistics.maleCount}
        />
      </Col>
      <Col xs={24} md={12} xl={6}>
        <StatisticItem
          icon={<HighMark className={cx('statistic_icon')} />}
          label="Mark >= 8"
          value={statistics.maleCount}
        />
      </Col>
      <Col xs={24} md={12} xl={6}>
        <StatisticItem
          icon={<LowMark className={cx('statistic_icon')} />}
          label="Mark <= 5"
          value={statistics.maleCount}
        />
      </Col>
    </Row>
  );
}
