import ChartHelper from './ChartHelper';
import Random from '../../utils/Random';


export default class extends ChartHelper {
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
}
