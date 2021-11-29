class ChangeQiitaColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :qiita, :description, :string
    add_column :qiita, :qiita_id, :string
  end
end
