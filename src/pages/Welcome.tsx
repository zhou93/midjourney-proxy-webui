import { getIndex } from '@/services/mj/api';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Alert, Card, Col, Divider, List, Row, Statistic, Tag, theme } from 'antd';
import React, { useEffect, useState } from 'react';

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();

  // 是否显示注册
  const [data, setData] = useState<any>();
  const [tops, setTops] = useState<any[]>();

  useEffect(() => {
    getIndex().then((res) => {
      if (res.success) {
        if (res.data) {
          setData(res.data);
          const vs = Object.keys(res.data.tops).map((x) => {
            return {
              ip: x,
              count: res.data.tops[x],
            };
          });
          setTops(vs);
        }
      }
    });
  }, []);

  return (
    <PageContainer>
      {data && data.notify && (
        <Alert
          description={data.notify}
          banner
          closable
          style={{
            marginBottom: 16,
          }}
        />
      )}

      <Card
        style={{
          borderRadius: 8,
          marginBottom: 16,
        }}
        styles={{
          body: {
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          }
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            {intl.formatMessage({ id: 'pages.welcome.link' })} Midjourney Proxy
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            {intl.formatMessage({ id: 'pages.welcome.description' })}
          </p>
        </div>
      </Card>

      {data && (
        <Card
          style={{
            borderRadius: 8,
          }}
          styles={{
            body: {
              backgroundImage:
                initialState?.settings?.navTheme === 'realDark'
                  ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                  : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
            }
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Statistic
                title={intl.formatMessage({ id: 'pages.welcome.todayDraw' })}
                value={data.todayDraw}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={intl.formatMessage({ id: 'pages.welcome.yesterdayDraw' })}
                value={data.yesterdayDraw}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={intl.formatMessage({ id: 'pages.welcome.totalDraw' })}
                value={data.totalDraw}
              />
            </Col>
          </Row>

          <Divider orientation="left">{intl.formatMessage({ id: 'pages.welcome.top5' })}</Divider>
          <List
            dataSource={tops}
            renderItem={(item) => (
              <List.Item>
                <Tag>{item.ip}</Tag> {item.count} {intl.formatMessage({ id: 'pages.welcome.unit' })}
              </List.Item>
            )}
          />
        </Card>
      )}
    </PageContainer>
  );
};

export default Welcome;
