import GlobalState from '../../../../utils/GlobalState';
import t from '../../../../languages';


export default class LanguagesHelper {
  static AILanguages = {
    default: 'Chuyên Ngành',
    school: 'Trường Học',
    swordplay: 'Kiếm Hiệp'
  }

  static useAILanguage(component = null) {
    GlobalState.useState('Lang-AI', 'default', component);
  }

  static setAILanguage(AILanguage) {
    GlobalState.setState('Lang-AI', AILanguage);
  }

  static getAILanguage() {
    return GlobalState.state['Lang-AI'];
  }

  static tAI(...texts) {
    return t(`AILang.${GlobalState.state['Lang-AI']}.${texts.join('.')}`);
  }
}

export const { tAI } = LanguagesHelper;
