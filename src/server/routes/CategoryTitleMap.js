
const homePath = '/';

const earthPicturePath = '/buc-tranh-trai-dat';
const epOrganismsPath = `${earthPicturePath}/sinh-vat`;
const epClimatePath = `${earthPicturePath}/khi-hau`;
const epPollutionPath = `${earthPicturePath}/o-nhiem`;
const epCommunitySharePath = `${earthPicturePath}/chia-se-tu-cong-dong`;

const theRealWorldPath = '/the-gioi-thuc';

const whatYouCanDoPath = '/dieu-ban-co-the-lam';
const doSupportingPath = `${whatYouCanDoPath}/ho-tro-cac-phong-trao`;
const doForClimatePath = `${whatYouCanDoPath}/khi-hau`;
const doForOrganismsPath = `${whatYouCanDoPath}/sinh-vat`;
const doForPollutionPath = `${whatYouCanDoPath}/giam-o-nhiem`;
const worldActionsPath = `${whatYouCanDoPath}/the-gioi-dang-hanh-dong`;
const GretaThunbergPath = `${whatYouCanDoPath}/Greta-Thunberg`;
const communityRecommendPath = `${whatYouCanDoPath}/chia-se-tu-cong-dong`;

const yourQuestionPath = '/dieu-ban-muon-biet';
const askForClimatePath = `${yourQuestionPath}/khi-hau`;
const askForOrganismsPath = `${yourQuestionPath}/sinh-vat`;
const askForPollutionPath = `${yourQuestionPath}/o-nhiem`;
const askForOthersPath = `${yourQuestionPath}/chu-de-khac`;

const titleMap = {
  [homePath]: 'Climate Strike Vietnam',

  [earthPicturePath]: 'Bức Tranh Trái Đất',
  [epClimatePath]: 'Bức Tranh Khí Hậu',
  [epOrganismsPath]: 'Bức Tranh Sinh Vật',
  [epPollutionPath]: 'Bức Tranh Ô Nhiễm',
  [epCommunitySharePath]: 'Chia sẻ từ cộng đồng',

  [theRealWorldPath]: 'Thế Giới Thực',

  [whatYouCanDoPath]: 'Điều Bạn Có Thể Làm',
  [doForClimatePath]: 'Cho Khí Hậu',
  [doForOrganismsPath]: 'Cho Sinh Vật',
  [doForPollutionPath]: 'Giảm Ô Nhiễm',
  [doSupportingPath]: 'Hỗ Trợ Các Phong Trào',
  [worldActionsPath]: 'Thế Giới Đang Hành Động',
  [GretaThunbergPath]: 'Greta Thunberg',
  [communityRecommendPath]: 'Chia Sẻ Từ Cộng Đồng',

  [yourQuestionPath]: 'Điều Bạn Muốn Biết?',
  [askForClimatePath]: 'Hỏi Về Khí Hậu',
  [askForOrganismsPath]: 'Hỏi Về Sinh Vật',
  [askForPollutionPath]: 'Hỏi Về Ô Nhiễm',
  [askForOthersPath]: 'Hỏi Chủ Đề Khác'
};

function getTitleByUrl(pathName) {
  return titleMap[pathName];
}

module.exports = getTitleByUrl;
