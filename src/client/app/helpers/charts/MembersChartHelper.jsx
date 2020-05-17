import moment from 'moment';
import ChartAdapter from './ChartAdapter';
import Random from '../../utils/Random';


export default class extends ChartAdapter {
  static Characteristics = {
    flexibility: 'Linh Hoạt',
    responsibility: 'Trách Nhiệm',
    persistence: 'Kiên Trì',
    problemSolving: 'Giải Quyết',
    adaptability: 'Thích Ứng',
    creativity: 'Sáng Tạo',
    communication: 'Giao Tiếp',
    teamwork: 'Làm Việc Nhóm',
    knowledge: 'Kiến Thức',
    physical: 'Thể Lực',
    hardWorking: 'Siêng Năng',
    timeManagement: 'Thời Gian',
    leadership: 'Lãnh Đạo',
    attentionToDetail: 'Quan Sát'
  };

  static generateSpotlight(member) {
    if (!member || (member.spotlight && member.spotlight.attentionToDetail)) {
      return member && member.spotlight;
    }
    const spotlight = Object.keys(this.Characteristics)
      .reduce((props, key) => {
        props[key] = Random.int(70, 100);
        return props;
      }, {});
    return spotlight;
  }

  static buildProps(members = []) {
    const indexBy = 'key';
    const keys = members.map(member => member.name);

    members.forEach((member) => {
      member.spotlight = this.generateSpotlight(member);
    });
    const data = Object.entries(this.Characteristics)
      .map(([key, value]) => ({
        [indexBy]: value,
        ...members.reduce((membersz, member) => {
          membersz[member.name] = member.spotlight[key] || 0;
          return membersz;
        }, {})
      }));

    return {
      keys,
      indexBy,
      data
    };
  }

  static buildMemberMarksProps(member) {
    const marks = member && member.marks;
    const data = Object.entries(this.Characteristics)
      .map(([key, text]) => {
        const dataz = marks && marks
          .sort((t1, t2) => new Date(t1) - new Date(t2))
          .map(mark => ({
            x: moment(mark.time).format('YYYY-MM-DD'),
            y: mark.spotlight[key]
          }));
        return {
          id: text,
          data: dataz || []
        };
      });
    return {
      data
    };
  }
}
