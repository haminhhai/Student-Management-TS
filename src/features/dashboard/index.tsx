import { Col, Row, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { dashboardActions } from './dashboardSlice';
import { StatisticItem, TopTable } from './components';
import { ReactComponent as Male } from 'assets/images/male.svg';
import { ReactComponent as Female } from 'assets/images/female.svg';
import { ReactComponent as HighMark } from 'assets/images/high-mark.svg';
import { ReactComponent as LowMark } from 'assets/images/low-mark.svg';
import style from './index.module.scss';
import classNames from 'classnames/bind';
import { listCityName, listCityNameProps } from 'constants/index';

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

  const resolveCityName = (cityId: string) => {
    const city = listCityName.find((city: listCityNameProps) => city.key === cityId);
    return city ? city.name : '';
  };

  return (
    <Spin spinning={loading}>
      {/* Statistics */}
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
            value={statistics.femaleCount}
          />
        </Col>
        <Col xs={24} md={12} xl={6}>
          <StatisticItem
            icon={<HighMark className={cx('statistic_icon')} />}
            label="Mark >= 8"
            value={statistics.highMarkCount}
          />
        </Col>
        <Col xs={24} md={12} xl={6}>
          <StatisticItem
            icon={<LowMark className={cx('statistic_icon')} />}
            label="Mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Col>
      </Row>

      {/* Student Top */}
      <h2 className={cx('title')}>Top Students</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <TopTable title="Top 5 Highest" data={highestStudentList} />
        </Col>
        <Col xs={24} xl={12}>
          <TopTable title="Top 5 Lowest" data={LowestStudentList} />
        </Col>
      </Row>

      {/* Ranking By City */}
      <h2 className={cx('title')}>Ranking By City</h2>
      <Row gutter={[16, 16]}>
        {rankingByCity.map((city) => (
          <Col xs={24} md={12}>
            <TopTable title={resolveCityName(city.cityId)} data={city.rankingList} />
          </Col>
        ))}
      </Row>
    </Spin>
  );
}
