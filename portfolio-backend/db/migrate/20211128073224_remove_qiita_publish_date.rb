class RemoveQiitaPublishDate < ActiveRecord::Migration[6.1]
  def change
    remove_column :qiita, :publish_data
    remove_column :qiita, :description
    remove_column :qiita, :image
    add_column :qiita, :publish_date, :datetime
  end
end
