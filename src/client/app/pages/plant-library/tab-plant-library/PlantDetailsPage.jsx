import React from 'react';
import Select from 'react-select';
import { Row, Col } from 'mdbreact';
import ReactMarkdown from 'react-markdown';
import { Box, Button } from '@material-ui/core';
import PostDetails from '../../../components/blog-base/post-details/PostDetails';
import Video from '../../../components/utils/video/Video';
import Rating from '../../../components/utils/rating/Rating';
import ShareButton from '../../../components/facebook/ShareButton';
import PostHelper from '../../../helpers/PostHelper';
import UserService from '../../../services/user/UserService';
import TimeAgo from '../../../components/utils/time-ago/TimeAgo';
import ModelService from '../../../services/AI/ModelService';
import { toOptions } from '../../../utils';
import PlantService from '../../../services/garden/PlantService';
import TaskInput from './components/task-input/TaskInput';


export default class extends PostDetails {
  constructor(props) {
    super(props);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleSaveTasks = this.handleSaveTasks.bind(this);
    this.state = {
      tasks: []
    };
  }

  handleTaskChange(value, name, task) {
    task[name] = value;
    this.setState(prevState => ({
      tasks: [...prevState.tasks]
    }));
  }

  handleAddTask() {
    this.setState(prevState => ({
      tasks: [{}, ...prevState.tasks]
    }));
  }

  handleSaveTasks() {
    const { data: post = {} } = this.props;
    PlantService.update({ _id: post._id, tasks: this.state.tasks });
  }

  handleModelChange(options) {
    const { data: post = {} } = this.props;
    post.models = options && options.map(option => option.value);
    this.setState({
      selectedModels: options
    });
    PlantService.update({ _id: post._id, models: post.models, climate: 'string' });
  }

  componentDidMount() {
    super.componentDidMount();
    this.fetchModels();
  }

  fetchModels() {
    ModelService.list()
      .then((rs) => {
        this.setState({
          models: toOptions(rs.data, '_id', 'title')
        });
      });
  }

  render() {
    const { data: post = {} } = this.props;
    const {
      _id, previewPhoto, video, title, summary, content, categories, createdAt,
      totalRating, totalVotes, rating
    } = post;
    const ratingInfo = {
      totalRating,
      totalVotes,
      rating: UserService.isLoggedIn && rating
    };
    const {
      models
    } = this.state || {};
    const {
      selectedModels = models && post.models && post.models.map(
        model => models.find(option => option.value === model)
      ),
      tasks
    } = this.state || {};

    return (
      <div className="post-details container">
        <Row>
          <Col size="12" md="8" className="mb-3">
            {(previewPhoto || video) && (
              <React.Fragment>
                <div className="post-details__categories mb-2 border-left pl-2">
                  <span className="post-details__categories__label">Chuyên mục: </span>
                  {categories.map(category => (
                    <b key={category.type} className={`post-details__categories__category pr-2 ${category.type}`}>{category.name}</b>
                  ))}
                </div>
                {video ? (
                  <Video title={title} src={video} preview={previewPhoto} />
                ) : (
                  <img alt={title} src={previewPhoto} className="w-100" />
                )}
              </React.Fragment>
            )}
            {this.renderBelowPreview()}
          </Col>
          <Col size="12" md={previewPhoto ? '4' : '12'}>
            <div className="post-details__title">{title}</div>
            <sup key="1" className="post-details__time text-sm mr-2"><TimeAgo time={createdAt} /></sup>
            <div className="post-details__action-buttons d-flex flex-wrap justify-content-between mt-2">
              <Rating {...ratingInfo} onRating={this.handleRating} id={_id} />
              <ShareButton url={PostHelper.buildPostUrl(post)} />
            </div>
            {!previewPhoto && (
              <React.Fragment>
                <sup key="2"> | </sup>
                <sup key="3" className="post-details__categories ml-2">
                  <span className="post-details__categories__label">Chuyên mục: </span>
                  {categories.map(category => (
                    <b key={category.type} className={`post-details__categories__category pr-2 ${category.type}`}>{category.name}</b>
                  ))}
                </sup>
              </React.Fragment>
            )}
            <div className="my-3">
              <Select
                options={models}
                value={selectedModels}
                onChange={this.handleModelChange}
                isMulti
              />
            </div>
            <div>
              <div>Chế độ chăm sóc thủ công:</div>
              <div>
                {tasks.map(task => (
                  <TaskInput task={task} onChange={this.handleTaskChange} />
                ))}
                <Box textAlign="center">
                  <Button onClick={this.handleAddTask}>+ Thêm Task</Button>
                  <Button onClick={this.handleSaveTasks}>Lưu Lại</Button>
                </Box>
              </div>
            </div>
            <hr className="my-3" />
            {summary && (
              <div className="post-details__summary mt-3">{summary}</div>
            )}
            <div className="post-details__content mt-3">
              <ReactMarkdown
                className="markdown"
                source={content}
                escapeHtml={false} // Do not turn it on for now
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
