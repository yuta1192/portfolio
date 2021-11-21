class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.string :name, null: false
      t.string :name_romaji, null: false
      t.text :description
      t.string :address
      t.date :birthday
      t.string :birthplace
      t.string :github_url, null: false
      t.string :twitter_url, null: false
      t.string :qiita_url, null: false
      t.string :image

      t.timestamps
    end
  end
end
