import type { ICharacter } from '@/types/api-types';
import { Component } from 'react';

type Props = { data: ICharacter[] };
class Result extends Component<Props> {
  render() {
    return <pre>{JSON.stringify(this.props.data, null, 2)}</pre>;
  }
}
export default Result;
