class QiitasController < ApplicationController
  def index
    qiitas = Qiita.order(publish_date: :desc)

    render json: qiitas
  end
end
