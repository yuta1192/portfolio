class CreateQiita < ActiveRecord::Migration[6.1]
  def change
    create_table :qiita do |t|
      t.string :name
      t.text :description
      t.string :url
      t.datetime :publish_data
      t.string :image

      t.timestamps
    end
  end
end
