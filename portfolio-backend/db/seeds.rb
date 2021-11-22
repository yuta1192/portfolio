Post.create!(
  [
    {
      title: 'Next.js + Ruby on Rails + Docker の環境構築'
    },
    {
      title: 'React Hooks でカスタムフックを作る'
    },
    {
      title: 'GraphQL と Apollo Client 入門'
    },
    {
      title: '【TypeScript4.3】Template Literal Types'
    },
    {
      title: 'Tailwind CSS でダークモード実装'
    },
  ]
)

Profile.create!(
  [
    {
      name: "紺野狐",
      name_romaji: "konno kitsune",
      description: "プログラミングを頑張っています。",
      github_url: "github.com/kitsune",
      twitter_url: "twitter.com/kitsune",
      qiita_url: "qiita.com/kitsune",
      address: "東京都",
      birthday: 19940808,
      birthplace: "東京都",
      image: nil,
    },
  ]
)

# アイコン画像はfont_awesomeを使用。
Hobby.create!(
  [
    {
      name: "ドラム",
      image: "fas fa-drum",
      profile_id: 1,
    },
    {
      name: "イラスト",
      image: "fas fa-palette",
      profile_id: 1,
    },
  ]
)

MyApp.create!(
  [
    {
      name: "ポートフォリオ",
      description: "こちらになります。",
      image: nil,
      url: "htpps://aaaa",
    },
    {
      name: "マイAPP",
      description: "私のAPP",
      image: nil,
      url: "htpps://yahoo.co.jp",
    },
  ]
)

Qiita.create!(
  [
    {
      name: "qiita",
      description: "ポートフォリオ作ってみた。",
      publish_data: 19940808,
      image: nil,
      url: "https://qiita.co.jp",
    },
    {
      name: "qiita2",
      description: "ポートフォリオ作ってみた。2",
      publish_data: 19940801,
      image: nil,
      url: "https://qiita2.co.jp",
    },
  ]
)

# deviconから取得
Skill.create!(
  [
    {
      name: "rails",
      kind: 1,
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg",
    },
    {
      name: "react",
      kind: 1,
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg",
    },
  ]
)

Career.create!(
  [
    {
      career_year_month: "202010",
      description: "aaaaaaaa",
    },
    {
      career_year_month: "202011",
      description: "bbbbbbbb",
    },
  ]
)
