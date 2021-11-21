class CreateMyApps < ActiveRecord::Migration[6.1]
  def change
    create_table :my_apps do |t|
      t.string :name
      t.text :description
      t.string :url
      t.string :image

      t.timestamps
    end
  end
end
