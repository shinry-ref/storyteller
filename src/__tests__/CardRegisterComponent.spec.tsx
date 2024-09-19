import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CardRegister } from "../pages/CardRegister";
import { getAllSkills, addUser, addUserSkill } from "../utils/supabaseFunction";

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
  (getAllSkills as jest.Mock).mockResolvedValue(
    [
    { 
      id: 1,
      name: 'React',
    },
    { 
      id: 2,
      name: 'Typescript',
    },
    { 
      id: 3,
      name: 'github',
    }
    ]
  );

  it("名前が表示されていること", async () => {

    render(
      <CardRegister />
    );
    
    const name = await screen.findByTestId("title");
    expect(name).toHaveTextContent('新規名刺登録');
  });

  it("全項目入力して登録ボタンを押すと/に遷移すること", async () => {
    render(
      <CardRegister />
    );
    
    fireEvent.change(screen.getByLabelText('英単語(ID)', { exact: false }), { target: { value: 'sample_id' } });
    fireEvent.change(screen.getByLabelText('名前', { exact: false }), { target: { value: '山田太郎' } });
    fireEvent.change(screen.getByLabelText('自己紹介', { exact: false }), { target: { value: '<h2>こんにちは</h2>' } });
    fireEvent.change(await screen.findByTestId('skill-select'), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText('Github ID', { exact: false }), { target: { value: 'yamada_github' } });
    fireEvent.change(screen.getByLabelText('Qiita ID', { exact: false }), { target: { value: 'yamada_qiita' } });
    fireEvent.change(screen.getByLabelText('X ID', { exact: false }), { target: { value: 'yamada_x' } });

    fireEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
      expect(addUser).toHaveBeenCalledWith(
        'sample_id',
        '山田太郎',
        '<h2>こんにちは</h2>',
        'yamada_github',
        'yamada_qiita',
        'yamada_x'
      );
      expect(addUserSkill).toHaveBeenCalledWith('sample_id', '1');
    });

    expect(mockedNavigator).toHaveBeenCalledWith('/');
  });

  it("IDがないときにエラーメッセージがでること", async () => {

    render(
      <CardRegister />
    );
    
    fireEvent.change(screen.getByLabelText('名前', { exact: false }), { target: { value: '山田太郎' } });
    fireEvent.change(screen.getByLabelText('自己紹介', { exact: false }), { target: { value: '<h2>こんにちは</h2>' } });
    fireEvent.change(await screen.findByTestId('skill-select'), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText('Github ID', { exact: false }), { target: { value: 'yamada_github' } });
    fireEvent.change(screen.getByLabelText('Qiita ID', { exact: false }), { target: { value: 'yamada_qiita' } });
    fireEvent.change(screen.getByLabelText('X ID', { exact: false }), { target: { value: 'yamada_x' } });

    fireEvent.click(screen.getByTestId('submit'));

    const useId = await screen.findByTestId("user-id-error");
    expect(useId).toHaveTextContent('必須項目です');
  });

  it("名前がないときにエラーメッセージがでること", async () => {

    render(
      <CardRegister />
    );
    
    fireEvent.change(screen.getByLabelText('英単語(ID)', { exact: false }), { target: { value: 'sample_id' } });
    fireEvent.change(screen.getByLabelText('自己紹介', { exact: false }), { target: { value: '<h2>こんにちは</h2>' } });
    fireEvent.change(await screen.findByTestId('skill-select'), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText('Github ID', { exact: false }), { target: { value: 'yamada_github' } });
    fireEvent.change(screen.getByLabelText('Qiita ID', { exact: false }), { target: { value: 'yamada_qiita' } });
    fireEvent.change(screen.getByLabelText('X ID', { exact: false }), { target: { value: 'yamada_x' } });

    fireEvent.click(screen.getByTestId('submit'));

    const useId = await screen.findByTestId("name-error");
    expect(useId).toHaveTextContent('必須項目です');
  });

  it("自己紹介がないときにエラーメッセージがでること", async () => {

    render(
      <CardRegister />
    );
    
    fireEvent.change(screen.getByLabelText('名前', { exact: false }), { target: { value: '山田太郎' } });
    fireEvent.change(screen.getByLabelText('英単語(ID)', { exact: false }), { target: { value: 'sample_id' } });
    fireEvent.change(await screen.findByTestId('skill-select'), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText('Github ID', { exact: false }), { target: { value: 'yamada_github' } });
    fireEvent.change(screen.getByLabelText('Qiita ID', { exact: false }), { target: { value: 'yamada_qiita' } });
    fireEvent.change(screen.getByLabelText('X ID', { exact: false }), { target: { value: 'yamada_x' } });

    fireEvent.click(screen.getByTestId('submit'));

    const useId = await screen.findByTestId("description-error");
    expect(useId).toHaveTextContent('必須項目です');
  });

  it("好きな技術がないときにエラーメッセージがでること", async () => {

    render(
      <CardRegister />
    );
    
    fireEvent.change(screen.getByLabelText('名前', { exact: false }), { target: { value: '山田太郎' } });
    fireEvent.change(screen.getByLabelText('英単語(ID)', { exact: false }), { target: { value: 'sample_id' } });
    fireEvent.change(screen.getByLabelText('自己紹介', { exact: false }), { target: { value: '<h2>こんにちは</h2>' } });
    fireEvent.change(screen.getByLabelText('Github ID', { exact: false }), { target: { value: 'yamada_github' } });
    fireEvent.change(screen.getByLabelText('Qiita ID', { exact: false }), { target: { value: 'yamada_qiita' } });
    fireEvent.change(screen.getByLabelText('X ID', { exact: false }), { target: { value: 'yamada_x' } });

    fireEvent.click(screen.getByTestId('submit'));

    const useId = await screen.findByTestId("skill-error");
    expect(useId).toHaveTextContent('必須項目です');
  });

  it("オプションを入力しなくても登録ができること", async () => {
    render(
      <CardRegister />
    );
    
    fireEvent.change(screen.getByLabelText('英単語(ID)', { exact: false }), { target: { value: 'sample_id' } });
    fireEvent.change(screen.getByLabelText('名前', { exact: false }), { target: { value: '山田太郎' } });
    fireEvent.change(screen.getByLabelText('自己紹介', { exact: false }), { target: { value: '<h2>こんにちは</h2>' } });
    fireEvent.change(await screen.findByTestId('skill-select'), { target: { value: "1" } });

    fireEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
      expect(addUser).toHaveBeenCalledWith(
        'sample_id',
        '山田太郎',
        '<h2>こんにちは</h2>',
        "",
        "",
        ""
      );
      expect(addUserSkill).toHaveBeenCalledWith('sample_id', '1');
    });

    expect(mockedNavigator).toHaveBeenCalledWith('/');
  });
});