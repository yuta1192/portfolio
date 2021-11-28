class ChangeColumnProfileImage < ActiveRecord::Migration[6.1]
  def change
    remove_column :profiles, :image
    add_column :profiles, :big_image, :string
    add_column :profiles, :small_image, :string
    add_column :profiles, :work_address, :string, after: :address
    add_column :profiles, :facebook_url, :string, after: :github_url
    add_column :profiles, :youtube_url, :string, after: :qiita_url
  end
end
