import {
    BaseEntity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class BaseCollection extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt: string;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        select: false,
    })
    updateAt: string;

    @Column({ name: 'active', default: true })
    active: boolean;
}
