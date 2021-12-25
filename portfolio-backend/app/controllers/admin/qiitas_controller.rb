class Admin::QiitasController < ApplicationController
  def index
    qiitas = Qiita.all

    render json: qiitas
  end

  def new
    qiita = Qiita.new

    render json: qiita
  end

  def edit
    qiita = Qiita.find(params[:id])

    render json: qiita
  end

  def update
    qiita = Qiita.find(params[:id])
    if qiita.update!(qiita_params)
      render json: nil, status: :ok
    else
      render json: qiita.errors, status: :unprocessable_entity
    end
  end

  def create
    qiita = Qiita.new(qiita_params)
    if qiita.save!
      render json: nil, status: :ok
    else
      render json: qiita.errors, status: :unprocessable_entity
    end
  end

  private

  def qiita_params
    params.require(:qiita).permit(:name, :description, :url, :publish_date, :qiita_id)
  end
end
