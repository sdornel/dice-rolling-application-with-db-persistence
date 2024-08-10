import { render, screen } from '@testing-library/react';
import DiceContainer from './diceContainer/page';
import Home from './page';

jest.mock('./diceContainer/page', () => () => <div>Mocked DiceContainer</div>);

describe('Home Component', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByText('Roll the dice! You know you want to...')).toBeInTheDocument();
  });

  it('renders the subheading', () => {
    render(<Home />);
    expect(screen.getByText('(Click dice to roll)')).toBeInTheDocument();
  });

  it('renders the DiceContainer component', () => {
    render(<Home />);
    expect(screen.getByText('Mocked DiceContainer')).toBeInTheDocument();
  });
});