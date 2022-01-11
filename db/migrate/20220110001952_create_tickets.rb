class CreateTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :tickets do |t|
      t.references :assignee
      t.references :submitter
      t.integer :project_id
      t.string :priority
      t.string :type
      t.string :status
      t.string :title
      t.text :description
      t.string :files
      t.string :category

      t.timestamps
    end
  end
end
