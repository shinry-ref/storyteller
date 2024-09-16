import { fireEvent, render, screen } from "@testing-library/react";
import { CardDetails } from "../pages/CardDetails";
import { getSelectAllSkills, getUser, getUserSkill } from "../utils/supabaseFunction";
import { MemoryRouter } from "react-router-dom";

jest.mock('../utils/supabaseFunction', () => ({
  getUser: jest.fn(),
  getUserSkill: jest.fn(),
  getSelectAllSkills: jest.fn(),
  getAllSkills: jest.fn(),
  addUser: jest.fn(),
  addUserSkill: jest.fn(),
}));

const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

describe("名刺カードのテスト", () => {
  (getUser as jest.Mock).mockResolvedValue(
    { 
      id: 'sample_id',
      name: 'テスト太郎',
      description: '<h1>テスト太郎の自己紹介</h1>' ,
      github_id: 'github_id',
      qiita_id: 'qiita_id',
      x_id: 'x_id'
    }
  );
  (getUserSkill as jest.Mock).mockResolvedValue(
    { 
      user_id: 'sample_id',
      skii_id: 'テスト太郎',
    }
  );
  (getSelectAllSkills as jest.Mock).mockResolvedValue(
    [{ 
      id: 1,
      name: 'React',
    }]
  );

  it("名前が表示されていること", async () => {

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );
    
    const name = await screen.findByTestId("name");
    expect(name).toHaveTextContent('テスト太郎');
  });

  it("自己紹介が表示されていること", async () => {

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );
    
    const description = await screen.findByTestId("description");
    expect(description).toHaveTextContent('テスト太郎の自己紹介');
  });

  it("技術が表示されていること", async () => {

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );
    
    const skill = await screen.findByTestId("skill");
    expect(skill).toHaveTextContent('React');
  });

  it("Githubアイコンが表示されていること", async () => {

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );
    const github = await screen.findByTestId("github");
    expect(github).toBeInTheDocument();
  });

  it("Qiitaのアイコンが表示されていること", async () => {

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );
    const qiita = await screen.findByTestId("qiita");
    expect(qiita).toBeInTheDocument();
  });

  it("xのアイコンが表示されていること", async () => {

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );
    const x = await screen.findByTestId("x");
    expect(x).toBeInTheDocument();
  });

  it("戻るボタンをクリックすると/に遷移すること", async () => {

    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );

    const backButton = await screen.findByTestId("back-button");
    fireEvent.click(backButton);

    expect(mockedNavigator).toHaveBeenCalledWith('/');
  });
});