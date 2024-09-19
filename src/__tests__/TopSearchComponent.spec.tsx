import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TopSearch } from "../pages/TopSearch";

jest.mock('../utils/supabaseFunction', () => ({
  getAllSkills: jest.fn(),
  addUser: jest.fn(),
  addUserSkill: jest.fn(),
}));

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

describe("名刺登録ページのテスト", () => {

  it("名前が表示されていること", async () => {

    render(
      <TopSearch />
    );
    
    const name = await screen.findByTestId("title");
    expect(name).toHaveTextContent('デジタル名刺アプリ');
  });

  it("IDを入力してボタンを押すと/cards/:idに遷移すること", async () => {
    render(
      <TopSearch />
    );
    
    fireEvent.change(screen.getByLabelText('検索ID'), { target: { value: 'sample_id' } });

    fireEvent.click(screen.getByTestId('search'));

    await waitFor(() => {
    expect(mockedNavigator).toHaveBeenCalledWith('/cards/sample_id');
    });
  });

  it("IDを入力しないでボタンを押すとエラーメッセージが表示されること", async () => {
    render(
      <TopSearch />
    );
    
    fireEvent.click(screen.getByTestId('search'));

    const useId = await screen.findByTestId("user-id-error");
    expect(useId).toHaveTextContent('検索したい名刺のIDを入力してください');
  });

  it("新規登録はこちらを押すと/cards/registerに遷移すること", async () => {
    render(
      <TopSearch />
    );
    
    fireEvent.click(screen.getByTestId('register'));

    expect(mockedNavigator).toHaveBeenCalledWith('/cards/register');
  });
});