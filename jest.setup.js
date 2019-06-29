import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// NOTE: that there is a different package for every version on react

configure({ adapter: new Adapter() });
