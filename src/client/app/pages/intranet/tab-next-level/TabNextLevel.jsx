/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Col, MDBBtn } from 'mdbreact';
import AdminPage from '../../_base/AdminPage';
import t from '../../../languages';
import { SectionBody, Section, SectionHeader } from '../../../layouts/base/section';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import superrequest from '../../../utils/superrequest';
import ApiEndpoints from '../../../utils/ApiEndpoints';
import ItemList from '../../../components/utils/item-list/ItemList';
import './TabNextLevel.scss';
import MemberBadge from '../../../../assets/badges/MemberBadge';
import UserService from '../../../services/user/UserService';
import RouteConstants from '../../../utils/RouteConstants';
import HistoryHelper from '../../../helpers/HistoryHelper';


export default class extends AdminPage {
  constructor(props) {
    super(props, t('pages.intranet.title.nextLevel'));
    this.bind(this.handleAddColumn, this.handleAddItem);
    this.state = {
      nextLevel: {
        cols: []
      }
    };
    UserService.useUserState(this);
  }

  componentDidMount() {
    super.componentDidMount();
    this.fetchNextLevel();
  }

  fetchNextLevel() {
    superrequest.get(ApiEndpoints.nextLevel)
      .then((res) => {
        this.setState({
          nextLevel: res.data
        });
      });
  }

  handleAddColumn() {
    this.setState(prevState => ({
      nextLevel: {
        ...prevState.nextLevel,
        cols: [
          { title: `Lĩnh vực ${prevState.nextLevel.cols.length + 1}`, items: [] },
          ...(prevState.nextLevel.cols || [])
        ]
      }
    }));
  }

  handleAddItem(event) {
    const { currentTarget: { dataset: { colIndex } } } = event;
    const { nextLevel: { cols } } = this.state;
    const column = cols[colIndex];
    column.items.unshift({
      _id: Math.random(),
      name: `Kiến thức ${column.items.length + 1}`,
      createdAt: Date.now()
    });
    this.forceUpdate();
  }

  render() {
    if (!UserService.isMember) {
      return HistoryHelper.replaceRoute(RouteConstants.homeLink);
    }
    const { nextLevel: { cols = [] } } = this.state;
    const columnProps = {
      lg: 4, md: 6, sm: 6, xs: 12, className: 'next-level__column text-center'
    };
    const { user } = UserService;

    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.intranet.message.nextLevel')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <div className="text-center mt-5 mb-3">
            <div className="next-level__info">
              <div className="next-level__info__name">{user.name}</div>
              <div className="next-level__info__badges">
                {user.badges && <MemberBadge badges={user.badges} />}
              </div>
            </div>
          </div>
          <Row className="mt-5">
            <Col {...{
              lg: 4, md: 6, sm: 6, xs: 12, className: 'text-center'
            }}
            >
              <MDBBtn onClick={this.handleAddColumn}>+ Thêm Cột Mới</MDBBtn>
            </Col>
          </Row>
          <Row className="next-level">
            {cols && cols.map(({ title, items }, index) => (
              <Col {...columnProps} key={index}>
                <div className="next-level__column__title">{title}</div>
                <div>
                  <span
                    data-col-index={index}
                    onClick={this.handleAddItem}
                    className="link my-2 text-light hover-light-red"
                  >+ Thêm kiến thức
                  </span>
                </div>
                <ItemList items={items} />
              </Col>
            ))}
          </Row>
        </SectionBody>
      </Section>
    );
  }
}
