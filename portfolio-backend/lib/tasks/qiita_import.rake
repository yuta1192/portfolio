require 'batches/qiita_import'

namespace :qiita_import do
  desc 'Qiita 情報取得'
  task import: :environment do
    Batches::QiitaImport.import
  end
end
