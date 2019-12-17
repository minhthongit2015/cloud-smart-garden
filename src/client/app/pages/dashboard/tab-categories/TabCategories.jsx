import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import AdminPage from '../../_base/AdminPage';
import CategoryService from '../../../services/CategoryService';
import MultiDragableTree from '../../../components/utils/multi-dragable-tree/MultiDragableTree';


export default class extends AdminPage {
  constructor(props) {
    super(props, t('pages.admin.title.categories'));
    this.state = {
      items: null
    };
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
    CategoryService.useCategoriesState(this);
  }

  loadItems(categories) {
    this.root = {
      id: 'root',
      content: 'root',
      items: []
    };
    this.state.items = categories.map(category => this.getChildren(category, this.root));
    this.root.items = this.state.items;
  }

  getChildren(category, parent) {
    return {
      id: category._id,
      content: category.name,
      parent,
      items: category.children.map(subCategory => this.getChildren(subCategory, category))
    };
  }

  handleCategoriesChange(items) {
    this.setState({
      items
    });
  }

  render() {
    console.log('render categories');
    if (!this.state.items
      && CategoryService.categoryArray && CategoryService.categoryArray.length) {
      this.loadItems(CategoryService.categoryArray);
      // this.loadItems(CategoryService.categoryArray);
    }

    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.admin.message.categories')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <MultiDragableTree
            root={this.root}
            items={this.state.items}
            onChange={this.handleCategoriesChange}
          />
        </SectionBody>
      </Section>
    );
  }
}
