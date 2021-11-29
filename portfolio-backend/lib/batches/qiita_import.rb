require "open-uri"
require "nokogiri"
require "date"

module Batches
  class QiitaImport
    class << self
      URL = 'https://qiita.com/api/v2/users/kitune_programer/items'.freeze

      def import
        open = open(URL).read
        hash = JSON.parse(open)

        raise 'invalid qiita' if hash.blank?

        ActiveRecord::Base.transaction do
          Qiita.destroy_all
          hash.each do |h|
            Qiita.create!(
              qiita_id: h["id"],
              name: h["title"],
              description: h["body"],
              publish_date: h["created_at"],
              url: h["url"],
            )
          end
        end
      end
    end
  end
end
